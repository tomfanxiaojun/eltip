package skycanopy.util;

import java.util.Random;

public class PasswordUtil {
	/**
	 * 无大写字母
	 * @param length
	 * @return
	 */
	public static String getRandomString(int length) {   
        StringBuffer buffer = new StringBuffer("2345789acdefghijkmnpqrstuvwxyz");   
        StringBuffer sb = new StringBuffer();   
        Random r = new Random();   
        int range = buffer.length();
        
        for (int i = 0; i < length; i ++) {   
            sb.append(buffer.charAt(r.nextInt(range)));   
        }
        
        return sb.toString();   
    }
	/**
	 * 有大写字母
	 * @param length
	 * @return
	 */
	public static String getRandomString2(int length) {   
        StringBuffer buffer = new StringBuffer("2345789acdefghijkmnpqrstuvwxyzACDEFGHIJKMNPQRSTUVWXYZ");   
        StringBuffer sb = new StringBuffer();   
        Random r = new Random();   
        int range = buffer.length();
        
        for (int i = 0; i < length; i ++) {   
            sb.append(buffer.charAt(r.nextInt(range)));   
        }
        
        return sb.toString();   
    }
}
