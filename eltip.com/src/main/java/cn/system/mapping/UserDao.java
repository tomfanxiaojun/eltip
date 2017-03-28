package cn.system.mapping;

import java.util.List;

import cn.system.model.User;

public interface UserDao {
	public void addUser(User user);
	public void updataUser(User user);
	public void deleteById(Long id);
	public User findUser(User user);
	public List<User> findUsers(User user);
	public List<User> getUserList();

}
