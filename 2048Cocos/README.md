# 参考文档
> 本文档基于Win10 64位系统，使用Mac若遇到问题可一起交流解决。
> 本文档用于如何使用H5引擎库，以及指引如何进行开发、代码打包及发布项目

## 使用前提
- 安装最新稳定版的NodeJS(v8.11.1)，安装后NPM会随之安装

## 开发阶段
### 编译
```
npm run dev
```

每次修改代码后，重复执行此语句，如果觉得每次编译太麻烦，使用如下命令：

```
npm run watch
```

### 查看效果
- cocos run -p web
可见如下页面：
![](./Readme/0.png)

- 配置nginx，自定义域名访问（后续测试网络请求也更加方便） 
```
server
{
    listen       80;
    server_name  test.ryoma.com;

    location / {
		root F:\web\GitQuqi\engine\cocos2d-ts/;
        index index.html  index.php;
					
		if (!-f $request_filename){
			rewrite ^(.+)$  /index.html last;
		}
    }
	
	location ^~ /api/ {
		proxy_pass    http://antd_doc_backend;
		proxy_http_version 1.1;
	}
}
```
可见如下页面：
![](./Readme/1.png)

## 发布阶段
### 编译
```
npm run pro
```

### cocos资源打包
```
cocos compile -p web -m release
```

### TS编译的内容复制至最终待发布目录中
```
npm run copysrc
```
此时，```/publish/html5```文件夹下，即为待发布的全部内容。
![](./Readme/2.png)

### 还有更方便的
```
npm run deploy
```
如果觉得以上三个步骤太麻烦，直接执行```npm run deploy```会有同样的效果