// /* 
// 1. Use the inquirer npm package to get user input.
// 2. Use the qr-image npm package to turn the user entered URL into a QR code image.
// 3. Create a txt file to save the user input using the native fs node module.
// */

// import inquirer from "inquirer";
// import qr from "qr-image"
// import fs, { writeFile } from "fs";

// inquirer
//   .prompt([
//     {
//         "message" : "Type in your URL:",
//         "name" : "URL",
//     },
//   ])
//   .then((answers) => {
//     const url = answers.URL;
//     var qr_svg = qr.image(url);
//     qr_svg.pipe(fs.createWriteStream('qr_img.png'));

//     fs.writeFile("URL.txt", url, (err) => {
//         if (err) throw err;
//         console.log("The file has been saved!");
//     });
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });

 

 
// var svg_string = qr.imageSync('I love QR!', { type: 'svg' });




import express from "express";
import fs from "fs";
import qr from "qr-image";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

// Serve static files like index.html and qr_img.png
app.use(express.static("."));
app.use(bodyParser.json());

app.post("/generate", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, message: "No URL provided" });
  }

  try {
    const qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));

    fs.writeFile("URL.txt", url, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Failed to save URL" });
      }

      return res.json({ success: true, message: "QR code generated successfully" });
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Internal error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
