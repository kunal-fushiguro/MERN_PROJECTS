import { writeFile } from "fs";
import { exec } from "child_process";

const codeRun = async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.json({
      msg: "plz send a code",
    });
  }
  writeFile("compliecode.js", code, (err) => {
    if (err) {
      return res.json({
        msg: "error1",
      });
    }
    console.log("Successfully created ");
    exec("node compliecode.js", (err, stdout, stderr) => {
      if (err) {
        return res.json({
          msg: "error while executing a file",
          error: stderr,
        });
      }
      return res.json({
        msg: "code run successfully",
        output: stdout,
      });
    });
  });
};

export { codeRun };
