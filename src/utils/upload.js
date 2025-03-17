const multer = require("multer");
const {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand, // Added this import
  DeleteObjectCommand,
  ListObjectsCommand,
} = require("@aws-sdk/client-s3");
const config = require("config");
const crypto = require("crypto");

// Configure S3 client for Filebase
const s3Client = new S3Client({
  endpoint: "https://s3.filebase.com",
  region: "us-east-1",
  forcePathStyle: true,
  credentials: {
    accessKeyId: "2A7A23F6745B5BA5F745",
    secretAccessKey: "MW27qLP2uBv7qkHAdsxtrbh4v14R6dejZv19RkfX",
  },
});

const BUCKET_NAME = "vantagepinnacle";
const FILEBASE_SUBDOMAIN = "happy-maroon-tarsier";

// Configure multer to store file in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Generate unique filename
const generateUniqueFilename = (originalname, fieldname) => {
  const fileExtension = originalname.split(".").pop();
  const uniqueString = crypto.randomBytes(16).toString("hex");
  return `${fieldname}-${uniqueString}.${fileExtension}`;
};

// Sleep function to wait for IPFS processing
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Middleware to upload to Filebase
const uploadToFilebase = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    console.log("Starting file upload to Filebase...");

    const filename = generateUniqueFilename(
      req.file.originalname,
      req.file.fieldname
    );

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: "public-read",
    };

    // Upload the file
    const command = new PutObjectCommand(uploadParams);
    const uploadResult = await s3Client.send(command);

    // Log the upload result
    console.log("Upload result:", uploadResult);

    // Construct the URL based on the filename
    const filebaseUrl = `https://${FILEBASE_SUBDOMAIN}.myfilebase.com/${filename}`;

    // Add the file information to the request object
    req.file.filename = filename;
    req.file.filebaseUrl = filebaseUrl;

    console.log("File uploaded successfully:", {
      filename,
      url: filebaseUrl,
    });

    next();
  } catch (error) {
    console.error("Error uploading to Filebase:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      error: "Error uploading file",
      details: error.message,
    });
  }
};
// Middleware to upload to Filebase
const uploadToMultipleFilebase = async (req, res, next) => {
  try {
    if (!req.files && !req.file) {
      return next();
    }

    const files = req.files || [req.file];
    const uploadedFiles = [];

    for (const file of files) {
      const filename = generateUniqueFilename(
        file.originalname,
        file.fieldname
      );

      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      };

      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);

      // Wait for a moment to ensure the file is processed
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get IPFS URL immediately after upload
      const ipfsUrl = await getIpfsCid(filename);

      uploadedFiles.push({
        filename,
        ipfsUrl,
        originalname: file.originalname,
      });
    }

    // Attach the results to the request object
    if (req.files) {
      req.files = req.files.map((file, index) => ({
        ...file,
        filename: uploadedFiles[index].filename,
        ipfsUrl: uploadedFiles[index].ipfsUrl,
      }));
    } else if (req.file) {
      req.file = {
        ...req.file,
        filename: uploadedFiles[0].filename,
        ipfsUrl: uploadedFiles[0].ipfsUrl,
      };
    }

    next();
  } catch (error) {
    console.error("Error uploading to Filebase:", error);
    res.status(500).json({
      error: "Error uploading file",
      details: error.message,
    });
  }
};
// Optional: Function to get IPFS CID for a file
const getIpfsCid = async (filename) => {
  try {
    const command = new HeadObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
    });

    const response = await s3Client.send(command);
    console.log("response: ", response.Metadata?.cid);
    return `https://happy-maroon-tarsier.myfilebase.com/ipfs/${response.Metadata?.cid}`;
  } catch (error) {
    console.error("Error getting IPFS CID:", error);
    return null;
  }
};

// Get filename from Head request using CID
const getFilenameFromCid = async (cid) => {
  console.log("cid: ", cid);
  try {
    const listParams = {
      Bucket: BUCKET_NAME,
    };

    // List objects to find file with matching CID in metadata
    const command = new ListObjectsCommand(listParams);
    const response = await s3Client.send(command);
    console.log("response: ", response);

    for (const object of response.Contents || []) {
      const headCommand = new HeadObjectCommand({
        Bucket: BUCKET_NAME,
        Key: object.Key,
      });

      const headResponse = await s3Client.send(headCommand);
      console.log("headResponse: ", headResponse);
      if (headResponse.Metadata?.cid === cid) {
        return object.Key;
      }
    }
    return null;
  } catch (error) {
    console.error("Error getting filename from CID:", error);
    return null;
  }
};

// Delete file using S3 key/filename
const deleteFileFromFilebase = async (filename) => {
  try {
    const deleteParams = {
      Bucket: BUCKET_NAME,
      Key: filename,
    };

    const command = new DeleteObjectCommand(deleteParams);
    await s3Client.send(command);
    console.log(`Successfully deleted file: ${filename}`);
    return true;
  } catch (error) {
    console.error("Error deleting file from Filebase:", error);
    return false;
  }
};

module.exports = {
  upload,
  uploadToFilebase,
  getIpfsCid,
  deleteFileFromFilebase,
  getFilenameFromCid,
  uploadToMultipleFilebase,
};
