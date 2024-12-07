document.addEventListener("DOMContentLoaded", function () {
  // 显示加载动画
  const loading = document.createElement("div");
  loading.classList.add("loading");
  loading.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(loading);

  // 设置页面内容元素
  const pageContent = document.querySelector(".page-content");

  // 页面加载完成时隐藏加载动画并显示页面内容
  window.onload = function () {
    loading.style.display = "none"; // 隐藏加载动画
    pageContent.classList.add("loaded"); // 添加loaded类触发淡入效果
  };
});
