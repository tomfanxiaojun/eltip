package cn.system.service;

import java.util.List;
import cn.system.model.User;

public interface IUserService {
	public void addUser(User user);
	public void updataUser(User user);
	public void deleteById(Long id);
	public User findUser(User user);
	public List<User> findUsers(User user);
	public List<User> getList();
	public User isExistUser(String email, String password);

}
