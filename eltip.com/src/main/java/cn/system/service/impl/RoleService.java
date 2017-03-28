package cn.system.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cn.system.mapping.RoleDao;
import cn.system.model.Role;
import cn.system.service.IRoleService;
@Service("roleService")
public class RoleService implements IRoleService {
	@Autowired
	private RoleDao roleDao;
	@Override
	public void addRole(Role role) {
		roleDao.addRole(role);
	}

	@Override
	public void updataRole(Role role) {
		roleDao.updataRole(role);
		
	}

	@Override
	public void deleteById(Integer id) {
		roleDao.deleteById(id);
		
	}

	@Override
	public Role findRole(Role role) {
		return roleDao.findRole(role);
	}

	@Override
	public List<Role> findRoles(List<Integer> ids) {
		return roleDao.findRoles(ids);
	}

}
