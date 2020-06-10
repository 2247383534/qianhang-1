const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x); //把字符串重新变成对象
const hashMap = xObject || [
  { logo: "G", logoType: "image", url: "https://google.com" },
  { logo: "G", logoType: "image", url: "https://github.com" },
  { logo: "U", logoType: "image", url: "https://unsplash.com" },
  { logo: "J", logoType: "image", url: "https://juejin.im" },
  { logo: "C", logoType: "image", url: "https://colorhunt.co" },
  {
    logo: "Z",
    logoType: "image",
    url: "https://www.zhihu.com",
  },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); // 删除/开头的内容
  //简化url(删除www. https://  http://)
};
const render = () => {
  $siteList.find("li:not(.last)").remove(); //找到所有li但是不找最后一个li（last）然后清空
  hashMap.forEach((node, index) => {
    //forEach会给两个参数一个是当前元素，一个是下标
    const $li = $(`<li>
        <div class="site">
          <div class="logo">${node.logo}</div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
           <svg class="icon">
              <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
    </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止眺转页面（冒泡）
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是什么？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(), //大写首字母
    logoType: "image",
    url: url,
  });

  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap); //将一个对象变成字符串
  window.localStorage.setItem("x", string);
};
$(document).on("keypress", (e) => {
  const { key } = e; //const key=e.key
  //键盘事件
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
