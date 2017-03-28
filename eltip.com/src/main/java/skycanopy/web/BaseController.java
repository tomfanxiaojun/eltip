package skycanopy.web;

import java.util.Date;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ResponseBody;

import skycanopy.core.BusinessException;

public class BaseController {
	
	protected ModelMapper modelMapper = new ModelMapper();
	
	public BaseController() {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
	}

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(Date.class, new DateEditor ());
		binder.registerCustomEditor(byte.class, new ByteEditor());
		binder.registerCustomEditor(int.class, new IntegerEditor());    
		binder.registerCustomEditor(long.class, new LongEditor());    
		binder.registerCustomEditor(double.class, new DoubleEditor());    
		binder.registerCustomEditor(float.class, new FloatEditor());    
	}
	
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public JsonResult handleUnexpectedError(Exception ex) {
    	System.err.println(ex.getMessage());
    	ex.printStackTrace();
    	
    	if (ex instanceof BusinessException) {
    		BusinessException be = (BusinessException)ex;
    		
    		return new JsonResult(false, be.getMessage(), be.getCode());
    	} else {
    		return new JsonResult(false, ex.getMessage());
    	}
    }
}
