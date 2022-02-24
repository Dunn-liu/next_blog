const axios = require('axios')
const http = require('http')
async function push() {
  // 获取文章id
  const res = await axios.get('https://api.liuqidong.com/blog/queryArticle', { params: { pageSize: 100000 } })
  const { data } = res
  if (data && data.code === 200) {
    data.data.map(async item => {
      const content = `https://blog.liuqidong.com/article?id=${item.id}`
      const options = {
        host: "data.zz.baidu.com",
        path: 'http://data.zz.baidu.com/urls?site=https://blog.liuqidong.com&token=TFVTB3On7AQeMNGX',//接口的调用地址
        method: "post",
        "User-Agent": "curl/7.12.1",
        headers: {
          "Content-Type": "text/plain",
          "Content-Length": content.length
        }
      };
      const req = http.request(options, function (res) {
        res.setEncoding("utf8");
        res.on("data", function (data) {
          console.log("data:", data); //返回的数据
        });
      });
      req.write(content);
      req.end;
      return true
    })
  }
}
push()
