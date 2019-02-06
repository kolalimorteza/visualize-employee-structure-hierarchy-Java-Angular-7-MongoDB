package com.developer.architecture.app;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import com.developer.architecture.app.domain.Employee;
import com.developer.architecture.app.repository.EmployeeRepository;
import com.developer.architecture.app.services.EmployeeServiceImpl;
import com.developer.architecture.app.services.IEmployeeService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DeveloperArchitectureApplicationTests {

	@TestConfiguration
	static class DeveloperArchitectureApplicationTestsContextConfiguration {
		@Bean
		public IEmployeeService employeeService() {
			return new EmployeeServiceImpl();
		}
	}

	@Autowired
	private IEmployeeService employeeService;

	@MockBean
	private EmployeeRepository employeeRepository;

	@Before
	public void setUp() {
		Employee employeeAlex = getEmployeeMockObject();

		List<Employee> employees = new ArrayList<Employee>();

		employees.add(employeeAlex);

		Mockito.when(employeeRepository.findByEmployeeName(employeeAlex.getDisplayName())).thenReturn(employees);

	}

	@Test
	public void testSearchByName() {
		Employee employee = employeeService.getEmployeesByName("testuser").get(0);
		assertEquals(employee.getDisplayName(), "testuser");
	}

	@Test
	public void testSaveEmployee() {
		Employee testEmployee = getEmployeeMockObject();
		Mockito.when(employeeRepository.save(testEmployee)).thenReturn(testEmployee);

		Employee employee = employeeRepository.save(testEmployee);
		assertEquals(employee.getGuid(), "7d3abeb6-f864-4b57-bc1a-ef1c4114a571");
	}

	@Test
	public void testGetHierarchyByGuid() {
		Employee testEmployee = getEmployeeMockObject();
		Mockito.when(employeeRepository.findByGuid("7d3abeb6-f864-4b57-bc1a-ef1c4114a571")).thenReturn(testEmployee);
		List<Employee> employeeHierarchyList = employeeService
				.getHierarchyByGuid("7d3abeb6-f864-4b57-bc1a-ef1c4114a571");
		assertTrue(employeeHierarchyList.size() > 0);
	}

	@Test
	public void testGetAllemployee() {
		Employee testEmployee = getEmployeeMockObject();
		List<Employee> employeeList = new ArrayList<Employee>();
		employeeList.add(testEmployee);
		Mockito.when(employeeRepository.findAll()).thenReturn(employeeList);
		List<Employee> employeeHierarchyList = employeeService.getAllemployee();
		assertTrue(employeeHierarchyList.size() > 0);
	}

	private Employee getEmployeeMockObject() {
		Employee employeeAlex = new Employee();
		employeeAlex.setGuid("7d3abeb6-f864-4b57-bc1a-ef1c4114a571");
		employeeAlex.setAddress("test address");
		employeeAlex.setCity("testCity");
		employeeAlex.setDisplayName("testuser");
		employeeAlex.setCompanyName("testCompany");
		employeeAlex.setEmail("test@gmail.com");
		employeeAlex.setEmployeeName("testuser");
		employeeAlex.setRole("employee");
		employeeAlex.setSign(true);
		return employeeAlex;
	}

}
