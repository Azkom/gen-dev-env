/* require("./gulp/tasks/watch");
require("./gulp/tasks/styles");
require("./gulp/tasks/scripts");
require("./gulp/tasks/modernizr");
require("./gulp/tasks/build"); */
const { src, dest } = require("gulp");
const babel = require("gulp-babel");
exports.default = function() {
  return src("src/*js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(dest("output/"));
};
