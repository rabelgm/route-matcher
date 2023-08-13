/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./",
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: [
    "<rootDir>/lib/**/*.ts",
    "!<rootDir>/lib/**/constant.ts",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules"],
  coverageReporters: ["json", "html"],
  testMatch: ["<rootDir>/test/**/*.test.ts"],
};
