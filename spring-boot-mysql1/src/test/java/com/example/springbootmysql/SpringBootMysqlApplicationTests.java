package com.example.springbootmysql;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SpringBootMysqlApplicationTests {

	@Test
	public void contextLoads() {

	}
	@Before
	public void setup()
	{
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
				.addFilters(springSecurityFilterChain)
				.build();
	}
	@Test
	public void verifiesLoginPageLoads() throws Exception
	{
		mockMvc.perform(MockMvcRequestBuilders.get("/"))
				.andExpect(MockMvcResultMatchers.model().hasNoErrors())
				.andExpect(MockMvcResultMatchers.view().name("login"))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	public void testUserLogin()  throws Exception
	{
		HttpSession session = mockMvc.perform(post("/login")
				.contentType(MediaType.APPLICATION_FORM_URLENCODED)
				.param("username", "test")
				.param("password", "test123")
		)
				.andExpect(MockMvcResultMatchers.status().isOk())
				//.andExpect(redirectedUrl("/user/home"))
				.andReturn()
				.getRequest()
				.getSession();

		request.setSession(session);

		SecurityContext securityContext = (SecurityContext)   session.getAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);

		SecurityContextHolder.setContext(securityContext);
	}

	@Test
	public void testRetrieveUserBookings() throws Exception
	{
		testUserLogin();

		mockMvc.perform(MockMvcRequestBuilders.get("user/bookings"))
				.andExpect(MockMvcResultMatchers.model().hasNoErrors())
				.andExpect(MockMvcResultMatchers.model().attributeExists("bookings"))
				.andExpect(MockMvcResultMatchers.view().name("user/bookings"))
				.andExpect(content().string(containsString("Booking")));
	}

}
