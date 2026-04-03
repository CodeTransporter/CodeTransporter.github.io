// 等待整个HTML文档加载完毕后再执行脚本
document.addEventListener('DOMContentLoaded', () => {
    
    // ================= 1. 移动端导航栏切换逻辑 =================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const icon = hamburger.querySelector('i');

    // 点击汉堡菜单按钮
    hamburger.addEventListener('click', () => {
        // 切换导航菜单的显示/隐藏状态
        navLinks.classList.toggle('active');
        
        // 切换图标：菜单打开时变成 "X"，关闭时变回 "三横线"
        if(navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // ================= 2. 点击链接后自动收起菜单 =================
    const links = document.querySelectorAll('.nav-links li a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            // 如果当前是移动端展开状态，点击任意链接后收起面板
            if(navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // ================= 3. 导航栏滚动阴影效果 =================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        // 当页面向下滚动超过50像素时，给导航栏增加深色阴影
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.6)';
            navbar.style.background = 'rgba(10, 14, 23, 0.95)'; // 颜色稍微加深
        } else {
            // 回到顶部时恢复原样
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(10, 14, 23, 0.8)';
        }
    });

    // ================= 4. 代码块一键复制功能 (拓展优化) =================
    // 寻找所有的代码块
    const preElements = document.querySelectorAll('pre');
    preElements.forEach(pre => {
        // 创建一个复制按钮
        const copyBtn = document.createElement('button');
        copyBtn.innerText = '复制';
        copyBtn.style.position = 'absolute';
        copyBtn.style.top = '10px';
        copyBtn.style.right = '10px';
        copyBtn.style.padding = '5px 10px';
        copyBtn.style.border = 'none';
        copyBtn.style.borderRadius = '5px';
        copyBtn.style.background = 'rgba(0, 229, 255, 0.2)';
        copyBtn.style.color = '#00e5ff';
        copyBtn.style.cursor = 'pointer';
        copyBtn.style.fontSize = '0.8rem';
        
        // 设置父元素为相对定位，以便按钮绝对定位
        pre.style.position = 'relative';
        pre.appendChild(copyBtn);

        // 点击复制的逻辑
        copyBtn.addEventListener('click', () => {
            const code = pre.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                copyBtn.innerText = '已复制!';
                copyBtn.style.background = 'rgba(0, 255, 157, 0.2)';
                copyBtn.style.color = '#00ff9d';
                
                // 2秒后恢复原样
                setTimeout(() => {
                    copyBtn.innerText = '复制';
                    copyBtn.style.background = 'rgba(0, 229, 255, 0.2)';
                    copyBtn.style.color = '#00e5ff';
                }, 2000);
            });
        });
    });

});