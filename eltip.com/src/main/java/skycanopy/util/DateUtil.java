
package skycanopy.util;


import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
	public static String getUseTime(Date date){
		
		long now = System.currentTimeMillis();
		long time = now-date.getTime();
		long day = time/(1000*60*60*24);
		
		return ""+day;
	}
	public static String getLeftTime(Date date){
	
		long now = System.currentTimeMillis();
		long time = now-date.getTime();
		long day = time/(1000*60*60*24);
		
		return ""+(365-day);
	}
	public static String dateToString(Date time){ 
	    SimpleDateFormat formatter; 
	    formatter = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss"); 
	    String ctime = formatter.format(time); 

	    return ctime; 
	} 
}



