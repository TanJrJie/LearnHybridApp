var datas = "";//datas need write
var directory = "";//default directory
var fileName = "";//default file name

function write(data, directory, fileName) {
    this.datas = data;
    this.directory = directory;
    this.fileName = fileName;

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
}

//获取目录，如果不存在则创建该目录
function onFileSystemSuccess(fileSystem) {
    fileDirectory=fileSystem.root.getDirectory(directory, { create: true, exclusive: false }, onDirectorySuccess, onFileSystemFail);
}

//获取目录下面的文件，如果不存在则创建此文件
function onDirectorySuccess(fileDirectory) {
    fileDirectory.getFile(fileName, {create: true,exclusive: false}, onFileSuccess, onFileSystemFail);
}

//获取FileWriter对象，用于写入数据
function onFileSuccess(fileEntry) {
    fileEntry.createWriter(onFileWriterSuccess, onFileSystemFail);
}

//write datas
function onFileWriterSuccess(writer) {
    //	log("fileName="+writer.fileName+";fileLength="+writer.length+";position="+writer.position);
    writer.onwrite = function (evt) {//当写入成功完成后调用的回调函数
        console.log("write success");
    };
    writer.onerror = function (evt) {//写入失败后调用的回调函数
        console.log("write error");
    };
    writer.onabort = function (evt) {//写入被中止后调用的回调函数，例如通过调用abort()
        console.log("write abort");
    };

    // 快速将文件指针指向文件的尾部 ,可以append
    //	writer.seek(writer.length); 
    //	writer.truncate(11);//按照指定长度截断文件
    //	writer.abort();//中止写入文件

    writer.write(datas);//向文件中写入数据
}

function onFileSystemFail(error) {
    console.log("Failed to retrieve file:" + error.code);
}