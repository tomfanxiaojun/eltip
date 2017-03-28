package skycanopy.util;

import java.io.ByteArrayInputStream;
import java.sql.Blob;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
  
/** 
 * className:ConvertBlobTypeHandler 
 *  
 * 自定义typehandler，解决mybatis存储blob字段后，出现乱码的问题 
 * 配置mapper.xml： 
 * <result  typeHandler="cn.ffcs.drive.common.util.ConvertBlobTypeHandler"/> 
 *  
 * @author pengyh 
 * @version 1.0.0 
 * @date 2014-07-09 11:15:23 
 *  
 */  
public class ConvertBlobTypeHandler extends BaseTypeHandler<byte[]> {    
    //###指定字符集    
//    private static final String DEFAULT_CHARSET = "utf-8";    
    
    @Override    
    public void setNonNullParameter(PreparedStatement ps, int i,    
    		byte[] parameter, JdbcType jdbcType) throws SQLException {    
        ByteArrayInputStream bis;    
        try {    
            //###把String转化成byte流    
            bis = new ByteArrayInputStream(parameter);    
        } catch (Exception e) {    
            throw new RuntimeException("Blob Encoding Error!");    
        }       
        ps.setBinaryStream(i, bis);    
    }    
    
    @Override    
    public byte[] getNullableResult(ResultSet rs, String columnName)    
            throws SQLException {    
        Blob blob = rs.getBlob(columnName);    
        byte[] returnValue = null;    
        if (null != blob) {    
            returnValue = blob.getBytes(1, (int) blob.length());    
        }    
        try {    
            //###把byte转化成string    
            return returnValue;    
        } catch (Exception e) {    
            throw new RuntimeException("Blob Encoding Error!");    
        }    
    }    
    
    @Override    
    public byte[] getNullableResult(CallableStatement cs, int columnIndex)    
            throws SQLException {    
        Blob blob = cs.getBlob(columnIndex);    
        byte[] returnValue = null;    
        if (null != blob) {    
            returnValue = blob.getBytes(1, (int) blob.length());    
        }    
        try {    
            return returnValue;    
        } catch (Exception e) {    
            throw new RuntimeException("Blob Encoding Error!");    
        }    
    }  
  
    @Override  
    public byte[] getNullableResult(ResultSet arg0, int arg1)  
            throws SQLException {  
        return null;  
    }    
}   