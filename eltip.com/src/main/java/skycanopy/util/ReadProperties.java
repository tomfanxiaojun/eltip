package skycanopy.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ReadProperties {
	static Properties pro=null;
	//getRourceAsStream  /os.skycanopy.cn/src/main/java/cn/officesafe/util/ReadProperties.java
	///os.skycanopy.cn/src/main/config/http.properties
	//ReadFile.class.getResourceAsStream("/com/lavasoft/res/a.txt");
	/**
	 * 
	 * @param str 文件地址
	 * @param falg 为true是绝对路径 false为相对路劲
	 * @return	属性值
	 * @throws IOException
	 */
	private static  Properties readProperties(String str,Boolean falg) throws IOException{
		pro = new Properties();
		InputStream in = null;
		if(falg){
			in = new FileInputStream(new File(str));
		}else{
			in = ReadProperties.class.getResourceAsStream(str);
		}
			try {
				if (in != null) {
					pro.load(in);
				} else {
					throw new FileNotFoundException("property file '" + str 
							+ "' not found in the classpath");
				}
	
			} catch (Exception e) {
				System.out.println("Exception: " + e);
			} finally {
				in.close();
			}
			return pro;
	}
	
	/**
	 * 
	 * @param propertiesUrl 文件url
	 * @param propertiesItem	获取属性名称
	 * @param falg	 为true是绝对路径 false为相对路劲
	 * @return	属性值
	 */
	public	static String getPropertiesItem(String propertiesUrl,String propertiesItem,Boolean falg){
		Properties propert = null;
		try {
			propert = ReadProperties.readProperties(propertiesUrl,falg);
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		return propert.getProperty(propertiesItem);
	}
}
