package cn.system.mapping;

import java.util.List;

import cn.system.model.Role;

public interface RoleDao {
	public void addRole(Role role);
	public void updataRole(Role role);
	public void deleteById(Integer id);
	public Role findRole(Role role);
	public List<Role> findRoles(List<Integer> ids);
}
