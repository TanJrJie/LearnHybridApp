var datas = "";//datas need write
var directory = "";//default directory
var fileName = "";//default file name

function write(data, directory, fileName) {
    this.datas = data;
    this.directory = directory;
    this.fileName = fileName;

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
}

//��ȡĿ¼������������򴴽���Ŀ¼
function onFileSystemSuccess(fileSystem) {
    fileDirectory=fileSystem.root.getDirectory(directory, { create: true, exclusive: false }, onDirectorySuccess, onFileSystemFail);
}

//��ȡĿ¼������ļ�������������򴴽����ļ�
function onDirectorySuccess(fileDirectory) {
    fileDirectory.getFile(fileName, {create: true,exclusive: false}, onFileSuccess, onFileSystemFail);
}

//��ȡFileWriter��������д������
function onFileSuccess(fileEntry) {
    fileEntry.createWriter(onFileWriterSuccess, onFileSystemFail);
}

//write datas
function onFileWriterSuccess(writer) {
    //	log("fileName="+writer.fileName+";fileLength="+writer.length+";position="+writer.position);
    writer.onwrite = function (evt) {//��д��ɹ���ɺ���õĻص�����
        console.log("write success");
    };
    writer.onerror = function (evt) {//д��ʧ�ܺ���õĻص�����
        console.log("write error");
    };
    writer.onabort = function (evt) {//д�뱻��ֹ����õĻص�����������ͨ������abort()
        console.log("write abort");
    };

    // ���ٽ��ļ�ָ��ָ���ļ���β�� ,����append
    //	writer.seek(writer.length); 
    //	writer.truncate(11);//����ָ�����Ƚض��ļ�
    //	writer.abort();//��ֹд���ļ�

    writer.write(datas);//���ļ���д������
}

function onFileSystemFail(error) {
    console.log("Failed to retrieve file:" + error.code);
}