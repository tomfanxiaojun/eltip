package cn.system.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import skycanopy.util.Role;
import skycanopy.util.Authentication;
import skycanopy.web.BaseController;
import skycanopy.web.JsonResult;
import cn.system.model.RoleUser;
import cn.system.model.User;
import cn.system.service.IRoleService;
import cn.system.service.IRoleUserService;
import cn.system.service.IUserService;
@Controller
@RequestMapping("user")
@Authentication({Role.USER})
public class UserController extends BaseController {
	@Autowired
	private IUserService userService;
	@Autowired
	private IRoleUserService roleUserService;
	@Autowired
	private IRoleService roleService;
	@RequestMapping("test")
	@ResponseBody
	@Authentication({Role.EVERYONE})
	public JsonResult updateAuthDistrict(){
		List<User> users = userService.getList();
		return new JsonResult(users);
	}
	@RequestMapping("login")
	@ResponseBody
	@Authentication({Role.EVERYONE})
	public JsonResult login(String email,String password){
		System.out.println("进来了");
		User user = null;
		if(email!=null&&email!=""&&password!=null&&password!=""){
			user=userService.isExistUser(email, password);	
		}else{
			return new JsonResult(false,"用户名--密码不能为空");
		}
		if(user!=null){
			Long userId = user.getId();
			List<RoleUser> roleUsers = roleUserService.findByUserId(userId);
			List<Integer> ids=new ArrayList<Integer>();
			if(roleUsers.size()>0){
				for (RoleUser roleUser : roleUsers) {
					ids.add(roleUser.getRoleId());
				}
			}
			List<cn.system.model.Role> roles = roleService.findRoles(ids);
			System.out.println(roles.size());
			
		}
		return new JsonResult(false,"ffffffff用户名密码ffffffffffffff不能为空");
	}
	@RequestMapping("addUser")
	@ResponseBody
	@Authentication({Role.EVERYONE})
	public JsonResult addUser(User user){
		System.out.println("进来了");
		userService.addUser(user);
		return new JsonResult("success");
	}
}
