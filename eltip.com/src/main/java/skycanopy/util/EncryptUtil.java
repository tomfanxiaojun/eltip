package skycanopy.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SignatureException;
import org.apache.commons.codec.digest.DigestUtils;


/** 
* 功能：支付宝MD5签名处理核心文件，不需要修改
* 版本：3.3
* 修改日期：2012-08-17
* 说明：
* 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
* 该代码仅供学习和研究支付宝接口使用，只是提供一个
* */

public class EncryptUtil {

    /**
     * 签名字符串
     * @param text 需要签名的字符串
     * @param key 密钥
     * @param input_charset 编码格式
     * @return 签名结果
     */
    public static String sign(String text, String key, String input_charset) {
    	text = text + key;
        return DigestUtils.md5Hex(getContentBytes(text, input_charset));
    }
    
    /**
     * 签名字符串
     * @param text 需要签名的字符串
     * @param sign 签名结果
     * @param key 密钥
     * @param input_charset 编码格式
     * @return 签名结果
     */
    public static boolean verify(String text, String sign, String key, String input_charset) {
    	text = text + key;
    	String mysign = DigestUtils.md5Hex(getContentBytes(text, input_charset));
    	if(mysign.equals(sign)) {
    		return true;
    	}
    	else {
    		return false;
    	}
    }

    /**
     * @param content
     * @param charset
     * @return
     * @throws SignatureException
     * @throws UnsupportedEncodingException 
     */
    private static byte[] getContentBytes(String content, String charset) {
        if (charset == null || "".equals(charset)) {
            return content.getBytes();
        }
        try {
            return content.getBytes(charset);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("MD5签名过程中出现错误,指定的编码集不对,您目前指定的编码集是:" + charset);
        }
    }
    
    /**
     * 将字符串加密
     * password 要加密的字符串
     * type 加密方式 
     */
    public static String getEncrypt(String password,String type) {
		String result = "";
		String text = password;
		MessageDigest messageDigest;
		byte[] md5Password = null;

		try {
			messageDigest = MessageDigest.getInstance(type);
			md5Password = messageDigest.digest(text.getBytes());
			
			for (byte b : md5Password) {
                result += Integer.toHexString(b & 0xFF);
            }
			
			result = result.toUpperCase();

		} catch (NoSuchAlgorithmException e) {
		}
	
		return result;
	}
    /**
     * Base64加密
     * @param str要加密的字符串
     * @return
     */
    public static String getBase64(String str) {  
    	
        return Base64.encode(str.getBytes());  
    } 
    /**
     * 将字符串转换为MD5
     * 32字节输出
     */
    public static String MD5(String str){
        String md5Str = null;         
        if (str != null && str.length() != 0) {            
         try {                 
          MessageDigest md = MessageDigest.getInstance("MD5");                
          md.update(str.getBytes());                 
          byte b[] = md.digest();                     
         
          StringBuffer buf = new StringBuffer("");                 
          for (int offset = 0; offset < b.length; offset++) {                
           int i = b[offset];                    
           if (i < 0)                        
            i += 256;                    
           if (i < 16)
            buf.append("0");
           buf.append(Integer.toHexString(i));                
           }              
          //32位
          md5Str = buf.toString();               
          //16位   md5Str = buf.toString().substring(8, 24);            
          } catch (NoSuchAlgorithmException e) {           
           e.printStackTrace();             
          }  
        }
        	return md5Str;
       }


}