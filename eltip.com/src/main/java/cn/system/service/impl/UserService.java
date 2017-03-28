package cn.system.service.impl;

import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import skycanopy.util.EncryptUtil;

import cn.system.mapping.UserDao;
import cn.system.model.User;
import cn.system.service.IUserService;

@Service("userService")
public class UserService implements IUserService{
	@Autowired
	private UserDao userDao;
	@Override
	public List<User> getList() {
		List<User> users = userDao.getUserList();
		return users;
	}
	@Override
	public void addUser(User user) {
		user = new User();
		String password = "123456";
		user.setPassword(EncryptUtil.getEncrypt(password, "sha-256"));
		user.setCode(1234567);
		user.setEmail("hxhss");
		user.setBirthday(new Date());
		user.setSex((byte)1);
		user.setUserName("老黄");
		userDao.addUser(user);	
	}
	@Override
	public void updataUser(User user) {
		userDao.updataUser(user);
		
	}
	@Override
	public void deleteById(Long id) {
		userDao.deleteById(id);
	}
	@Override
	public User findUser(User user) {
		return userDao.findUser(user);
	}
	@Override
	public List<User> findUsers(User user) {
		return userDao.findUsers(user);
	}
	@Override
	public User isExistUser(String email, String password) {
		String regEx = "\\d{1,}";
		Pattern pattern = Pattern.compile(regEx);
		Matcher matcher = pattern.matcher(email);
		boolean rs = matcher.matches();
		User user = new User();
		if(rs){
			user.setCode(Integer.parseInt(email));
		}else{
			user.setEmail(email);
		}
		user.setPassword(EncryptUtil.getEncrypt(password, "sha-256"));
		return findUser(user);
	}
}
