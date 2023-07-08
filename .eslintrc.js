//.eslintrc.js

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["airbnb", "any-other-config", "other-config", "prettier"],
  // 앞서 미리 적용시킨 eslint-config-prettier
  plugins: ["prettier"],
  // eslint-plugin-prettier를 적용시켜줍니다
  rules: { "prettier/prettier": "error" },
  // 자세히는 모르겠으나 Prettier의 formatting을 설정해주는 것으로 생각됩니다.
  //...
}
