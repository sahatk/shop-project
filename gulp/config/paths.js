import fs from "fs";
import path from "path";
import { globSync } from "glob";
import chalk from "chalk";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectDirName = path.basename(path.resolve());

const isBuild = process.argv.includes("--build");
const destFolder = isBuild ? "build" : "dist";
const srcFolder = "src";
const settingPaths = {
  fileExtensions: {
    pages: ["html", "vue", "md", "twig", "hbs", "njk", "jsx", "tsx"],
    styles: ["scss", "sass", "less", "css"],
    scripts: ["js", "ts", "json"],
    scriptsCjs: ["js", "ts", "json", "cjs"],
    images: ["png", "jpg", "jpeg", "gif", "svg", "ico", "webp", "mp3", "mp4", "avi", "wmv", "mkv", "mov", "flv", "webm", "3gp", "mpeg", "ogg"],
    fonts: ["csv", "eot", "ttf", "woff", "woff2"],
  },
  folderPublic: "public",
  serverIndex: "guide/cl.html",
  folderBackup: "_backup",
  fileBackup: [`**/*.*`, `!.git`, `!.git/**/*.*`, `!node_modules/**/*.*`, `!_backup/**/*.*`, `!dist/**/*.*`, `!build/**/*.*`],
};

// 프로젝트 폴더 경로 설정을 위한 도우미 함수
function getBuildPath(buildPath, defaultPath) {
  return isBuild ? buildPath : defaultPath;
}

// 프로젝트 폴더 경로 세팅 - build 경로 , dist 경로
const projectReplacePaths = {
  pathStyles: getBuildPath(`assets/styles`, `assets/styles`),
  pathScripts: getBuildPath(`assets/scripts`, `assets/scripts`),
  pathFonts: getBuildPath(`assets/fonts`, `assets/fonts`),
  pathImages: getBuildPath(`assets/images`, `assets/images`),
  pathGuideStyles: getBuildPath(`guide/assets/styles`, `guide/assets/styles`),
  pathGuideScripts: getBuildPath(`guide/assets/scripts`, `guide/assets/scripts`),
  pathGuideImages: getBuildPath(`guide/assets/images`, `guide/assets/images`),
  pathGuideImagesMailform: getBuildPath(`guide/assets/images/mailform`, `guide/assets/images/mailform`),
  pathGuideImagesIcon: getBuildPath(`guide/assets/images/ico`, `guide/assets/images/ico`),
  pathGuideComponents: getBuildPath(`guide/pages/components`, `guide/pages/components`),
  pathGuideFoundation: getBuildPath(`guide/pages/foundation`, `guide/pages/foundation`),
  pathGuideTemplate: getBuildPath(`guide/pages/template`, `guide/pages/template`),
  pathGuideComponentsElement: getBuildPath(`guide/pages/components/element`, `guide/pages/components/element`),
  pathGuideConvention: getBuildPath(`guide/pages/convention`, `guide/pages/convention`),
  pathGuideMailform: getBuildPath(`guide/pages/mailform`, `guide/pages/mailform`),
  pathGuideInclude: getBuildPath(`guide/pages/include`, `guide/pages/include`),
  pathPagesInclude: getBuildPath(`pages/include`, `pages/include`),
  pathPagesPrototype: getBuildPath(`pages/prototype`, `pages/prototype`),
  pathPagesSample: getBuildPath(`pages/sample`, `pages/sample`),
  pathPagesMain: getBuildPath(`pages/main`, `pages/main`),
  pathPagesCM: getBuildPath(`pages/CM`, `pages/CM`),
  pathPagesQK: getBuildPath(`pages/QK`, `pages/QK`),
  pathPagesMN: getBuildPath(`pages/MN`, `pages/MN`),
  pathPagesML: getBuildPath(`pages/ML`, `pages/ML`),
  pathPagesMY: getBuildPath(`pages/MY`, `pages/MY`),
  pathPagesDC: getBuildPath(`pages/DC`, `pages/DC`),
  pathPagesFG: getBuildPath(`pages/FG`, `pages/FG`),
  pathPagesPT: getBuildPath(`pages/PT`, `pages/PT`),
  pathPagesSC: getBuildPath(`pages/SC`, `pages/SC`),
  pathPagesCS: getBuildPath(`pages/CS`, `pages/CS`),
  pathPagesFT: getBuildPath(`pages/FT`, `pages/FT`),
  // 필요한 경로를 추가 합니다.
};

// 파일 경로
const filePath = path.join("src", "guide", "assets", "scripts", "codinglist.js");

// 파일 읽기
let fileContent = fs.readFileSync(filePath, "utf8");

// 객체를 문자열로 변환하여 삽입할 내용 생성
const dataStringDev = JSON.stringify(projectReplacePaths, null, 2); // dev 환경용 설정 문자열
// console.log('dataStringDev', dataStringDev);
const insertContentDev = `// START OF CODINGLIST PATHS DEV\nconst projectPathsDev = ${dataStringDev};\n// END OF CODINGLIST PATHS DEV`;

const dataStringBuild = JSON.stringify(projectReplacePaths, null, 2); // build 환경용 설정 문자열
const insertContentBuild = `// START OF CODINGLIST PATHS BUILD\nconst projectPathsBuild = ${dataStringBuild};\n// END OF CODINGLIST PATHS BUILD`;

// DEV 또는 BUILD 관련 내용을 조건에 따라 덮어쓰기
if (!isBuild) {
  fileContent = fileContent.replace(/\/\/ START OF CODINGLIST PATHS DEV[\s\S]*?\/\/ END OF CODINGLIST PATHS DEV/, insertContentDev);
} else {
  fileContent = fileContent.replace(/\/\/ START OF CODINGLIST PATHS BUILD[\s\S]*?\/\/ END OF CODINGLIST PATHS BUILD/, insertContentBuild);
}

// 변경된 내용을 파일에 쓰기
fs.writeFileSync(filePath, fileContent, "utf8");

// settingsPaths를 조합해서 실제로 task에서 사용하는 경로들입니다.
const projectPaths = {
  // pages
  pagesSrc: [`${srcFolder}/**/*.{${settingPaths.fileExtensions.pages}}`, `!${srcFolder}/**/_*.{${settingPaths.fileExtensions.pages}}`],
  pagesIncludeSrc: [`${srcFolder}/**/*.{${settingPaths.fileExtensions.pages}}`],
  pagesIncludeWatch: `${srcFolder}/**/_*.{${settingPaths.fileExtensions.pages}}`,
  pagesPrettier: [`${destFolder}/**/*.html`, `!${destFolder}/**/convention/**`],

  // styles
  stylesSrc: `${srcFolder}/**/*.{${settingPaths.fileExtensions.styles}}`,

  // scripts
  codinglistJsSrc: `${srcFolder}/**/*.{${settingPaths.fileExtensions.scripts}}`,
  scriptsSrc: `${srcFolder}/**/*.{${settingPaths.fileExtensions.scripts}}`,
  scriptsUISrc: `${srcFolder}/assets/scripts/ui/**/*.{${settingPaths.fileExtensions.scriptsCjs}}`,
  scriptsUIBaseSrc: `${srcFolder}/assets/scripts/ui/`,
  scriptsUIUtilsSrc: `${srcFolder}/assets/scripts/ui/utils/**/*.{${settingPaths.fileExtensions.scripts}}`,
  scriptsUIHooksSrc: `${srcFolder}/assets/scripts/ui/hooks/**/*.{${settingPaths.fileExtensions.scripts}}`,
  scriptsUITemplatesSrc: `${srcFolder}/assets/scripts/ui/templates/**/*.{${settingPaths.fileExtensions.scripts}}`,
  scriptsUIComponentsSrc: `${srcFolder}/assets/scripts/ui/components/**/*.{${settingPaths.fileExtensions.scripts}}`,
  scriptsLibSrc: `${srcFolder}/assets/scripts/lib/**/*.{${settingPaths.fileExtensions.scripts}}`,

  // images
  imagesSrc: `${srcFolder}/**/*.{${settingPaths.fileExtensions.images}}`,

  // fonts
  fontsSrc: `${srcFolder}/**/*.{${settingPaths.fileExtensions.fonts}}`,

  // public
  publicSrc: `${srcFolder}/${settingPaths.folderPublic}/**/*.*`,

  // server
  serverStart: `${settingPaths.serverIndex}`,

  // backup zip
  backupBase: `${projectDirName}`,
  backupSrc: settingPaths.fileBackup,
  backupDest: `${settingPaths.folderBackup}/`,

  // html validation
  htmlValidationSrc: [`${destFolder}/**/*.html`, `!${destFolder}/**/convention/**`, `!${destFolder}/**/include/**`, `!${destFolder}/**/mailform/**`],

  // style validation
  styleValidationSrc: `${destFolder}/**/*.css`,
};

export { __dirname, projectDirName, isBuild, destFolder, srcFolder, projectPaths, settingPaths, projectReplacePaths };
