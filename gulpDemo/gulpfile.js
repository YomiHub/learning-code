const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const less = require('gulp-less');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const open = require('open');

//使用gulp.task()建立任务
/* gulp.task('first', () => {
  //获取要处理的文件
  gulp.src('./src/css/reset.css')
    .pipe(gulp.dest('./dist/css'));
}); */

//使用gulp-htmlmin插件压缩文件 https://www.npmjs.com/package/gulp-htmlmin
gulp.task('htmlmin', (done) => {
  gulp.src('./src/view/*.html')   //压缩view文件夹下所有的html文件
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))  //压缩空格
    .pipe(gulp.dest('./dist/view'));
  done();//task完成时通知Gulp（而不是返回一个流）或者使用async···await
})

//使用gulp-less编译less：https://www.npmjs.com/package/gulp-less#using-plugins
//使用gulp-csso压缩:https://www.npmjs.com/package/gulp-csso
gulp.task('cssmin', async () => {
  await gulp.src(['./src/less/*.less', './src/css/*css'])
    .pipe(less()) //将less代码转为css
    .pipe(csso())
    .pipe(gulp.dest('./dist/css'));
})

//使用gulp-babel转为浏览器兼容的js：https://www.npmjs.com/package/gulp-babel
//使用gulp-uglify压缩代码
gulp.task('jsmin', () => {
  return gulp.src('./src/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())   //压缩JS
    .pipe(gulp.dest('./dist/js'));//使用return 代替done()、async
})

//拷贝静态文件所在的文件夹
gulp.task('copy', () => {
  return gulp.src(['./src/imgs/*', './src/imgs/**/*'])
    .pipe(gulp.dest('./dist/imgs'));  //拷贝图片
})

//构建任务
gulp.task('default', gulp.series(['htmlmin', 'cssmin', 'jsmin', 'copy'])); //通过执行gulp default或者gulp依次执行任务

//注册监视任务Gulp.watch(“监听的文件”，回调函数)。
gulp.task('watch', async () => {
  //开启监听
  livereload.listen();
  //确认监听的目标以及绑定相应的任务，在对应task中必须实时刷新.pipe(livereload())
  gulp.watch('./src/js/*.js', async () => {
    //4.0+ jsmin任务写在这里
    gulp.src('./src/js/*.js')
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(uglify())   //压缩JS
      .pipe(gulp.dest('./dist/js'))
      .pipe(livereload());  //实时刷新
  });
})


//全自动监视任务gulp-connect（browserSyn）
gulp.task('connect', async () => {
  connect.server({
    root: './dist',
    livereload: true,  //实时刷新
    port: 5000  //配置端口号
  });

  gulp.watch('./src/css/*.css', async () => {
    //4.0+ jsmin任务写在这里
    gulp.src(['./src/less/*.less', './src/css/*css'])
      .pipe(less()) //将less代码转为css
      .pipe(csso())
      .pipe(gulp.dest('./dist/css'))
      .pipe(connect.reload());  //实时刷新
  });

  open('http://localhost:5000');  //自动打开指定链接
})
