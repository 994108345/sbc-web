/*pathRewrite 部分的配置，"pathRewrite": {"^/api": ""} 如果没有这部分的配置，那在发送请求的时候，
实际请求的地址将会是http://localhost:3100/api/actionapi/。相较于真实url，会多出/api这一部分。*/
module.exports =
{
/*这里是前台调用后端接口时做的代理标识*/
  "/sbc-permission": {
    "target": "http://localhost:7011",
    "secure": false,
  },

  "/sbc-chatboard": {
    "target": "http://localhost:7012",
    "secure": false,
  }
}

