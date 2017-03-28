package skycanopy.util;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

import net.lingala.zip4j.core.ZipFile;
import net.lingala.zip4j.exception.ZipException;
import net.lingala.zip4j.model.ZipParameters;
import net.lingala.zip4j.util.Zip4jConstants;

/**
 * 压缩文件工具类
 * @author 20140624
 *
 */
public class FileUtil {
    /**
     * 向压缩文件夹中添加新文件
     * @param zipUrl 压缩文件夹路径
     * @param fileUrl 要添加文件的路径
     */
    public static void zipAddFile(String zipUrl,String fileUrl){
    	InputStream is = null;
		try {
			ZipFile zipFile = new ZipFile(zipUrl);
			ZipParameters parameters = new ZipParameters();
			parameters.setCompressionMethod(Zip4jConstants.COMP_DEFLATE);
			parameters.setFileNameInZip("officesafe.xml");
			parameters.setSourceExternalStream(true);
			is = new FileInputStream(fileUrl);
			zipFile.addStream(is, parameters);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
    }
    /**
     * 用指定文件替换压缩宝中指定文件名的文件
     * @param zipUrl 压缩文件夹路径
     * @param fileUrl 要添加文件的路径
     * @param fileName 要替换文件的文件名
     */
    public static void zipUpdateFile(String zipUrl,String fileUrl,String fileName){
    	InputStream is = null;
		try {
			ZipFile zipFile = new ZipFile(zipUrl);
			ZipParameters parameters = new ZipParameters();
			parameters.setCompressionMethod(Zip4jConstants.COMP_DEFLATE);
			parameters.setFileNameInZip(fileName);
			parameters.setSourceExternalStream(true);
			is = new FileInputStream(fileUrl);
			zipFile.removeFile(fileName);
			zipFile.addStream(is, parameters);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
    }
    /**
     * 
     * @param zipUrl 压缩包路径
     * @param filePath 配置文件
     * @param exePath 应用程序
     */
    public static void zipFile(String zipUrl,String filePath,String exePath){
	   try {  
           final ZipFile zipFile = new ZipFile(zipUrl); // 創建zip包，指定了zip路徑和zip名稱  
           final ArrayList<File> fileAddZip = new ArrayList<File>(); // 向zip包中添加文件集合  
           fileAddZip.add(new File(exePath)); // 向zip包中添加一个word文件  
           fileAddZip.add(new File(filePath));   
           final ZipParameters parameters = new ZipParameters(); // 设置zip包的一些参数集合  
          // parameters.setEncryptFiles(true); // 是否设置密码（此处设置为：是）  
           parameters.setCompressionMethod(Zip4jConstants.COMP_DEFLATE); // 压缩方式(默认值)  
          // parameters.setCompressionLevel(Zip4jConstants.DEFLATE_LEVEL_NORMAL); // 普通级别（参数很多）  
          // parameters.setEncryptionMethod(Zip4jConstants.ENC_METHOD_STANDARD); // 加密级别  
          // parameters.setPassword("123456"); // 压缩包密码为123456  
           zipFile.createZipFile(fileAddZip, parameters); // 创建压缩包完成  
       } catch (final ZipException e) {  
           // TODO Auto-generated catch block  
           e.printStackTrace();  
       } 
   }
    /**
     * 将文件转换成byte数组
     * @param file
     * @return
     * @throws IOException
     */
    public static byte[] getBytesFromFile(File file) throws IOException {
        InputStream is = new FileInputStream(file);
        	// 获取文件大小
        long length = file.length();
        if (length > Integer.MAX_VALUE) {
            // 文件太大，无法读取
        	throw new IOException("File is to large "+file.getName());
        }
		// 创建一个数据来保存文件数据
        byte[] bytes = new byte[(int)length];
        	// 读取数据到byte数组中
        int offset = 0;
        int numRead = 0;
        while (offset < bytes.length
               && (numRead=is.read(bytes, offset, bytes.length-offset)) >= 0) {
            offset += numRead;
        }
        	// 确保所有数据均被读取
        if (offset < bytes.length) {
            throw new IOException("Could not completely read file "+file.getName());
        }
        	// Close the input stream and return bytes
        is.close();
        return bytes;
    }
    /**
     * 将byte数组转换成文件
     * @param bfile byte数组
     * @param filePath 文件路径
     * @param fileName 文件名称，要加后缀
     */
    public static void getFile(byte[] bfile, String filePath,String fileName) {  
        BufferedOutputStream bos = null;  //新建一个输出流
        FileOutputStream fos = null;  //w文件包装输出流
        File file = null;  
        try {  
            File dir = new File(filePath);  
            if(!dir.exists()&&dir.isDirectory()){//判断文件目录是否存在  
                dir.mkdirs();  
            }  
            file = new File(filePath+"\\"+fileName);  //新建一个file类
            fos = new FileOutputStream(file);  
            bos = new BufferedOutputStream(fos);  //输出的byte文件
            bos.write(bfile);  
        } catch (Exception e) {  
            e.printStackTrace();  
        } finally {  
            if (bos != null) {  
                try {  
                    bos.close();  //关闭资源
                } catch (IOException e1) {  
                    e1.printStackTrace();  
                }  
            }  
            if (fos != null) {  
                try {  
                    fos.close();  //关闭资源
                } catch (IOException e1) {  
                    e1.printStackTrace();  
                }  
            }  
        }
    }
}
