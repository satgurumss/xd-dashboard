var Sequelize = require('sequelize'),
	sequelize = new Sequelize('xdensity', 'root', null, {
		dialect: "mysql",
		// or 'sqlite', 'postgres', 'mariadb'
		host: 'localhost',
		port: 3306, // or 5432 (for postgres)
		logging: false
	});

//initialize db connection
sequelize
	.authenticate()
	.then(function() {
		console.log('Connection has been established successfully.')
	})
	.catch(function(err) {
		console.log('Connection err. ' + err)
	});

//db models defintions

//-------ACCOUNT MODELS-------- //
AccountModel = sequelize.define("account", {
	account_ID: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	account_name: {
		type: Sequelize.STRING
	}
}, {
	tableName: 'account', // this will define the table's name
	timestamps: true // this will deactivate the timestamp columns

}, {
	updatedAt: 'last_update',
	createdAt: 'created_on'
});

UserModel = sequelize.define("user", {
	user_name: {
		type: Sequelize.STRING
	},
	user_email: {
		type: Sequelize.STRING
	},
	user_password: {
		type: Sequelize.STRING
	},
	user_role: {
		type: Sequelize.STRING
	},
	user_password_token: {
		type: Sequelize.STRING
	},
	user_isAdmin: {
		type: Sequelize.BOOLEAN
	}

}, {
	tableName: 'user', // this will define the table's name
	timestamps: true // this will deactivate the timestamp columns

}, {
	updatedAt: 'last_update',
	createdAt: 'created_on'
});

//------ DEPT Models -----//
DepartmentModel = sequelize.define("department", {
	department_name: {
		type: Sequelize.STRING
	}
}, {
	tableName: 'department', // this will define the table's name
	timestamps: true // this will deactivate the timestamp columns

}, {
	updatedAt: 'last_update',
	createdAt: 'created_on'
});

ProjectModel = sequelize.define("project", {
	project_name: {
		type: Sequelize.STRING
	},
	start_date: {
		type: Sequelize.DATE
	},
	end_date: {
		type: Sequelize.DATE
	},
	estimated_end_date: {
		type: Sequelize.DATE
	}
}, {
	tableName: 'project', // this will define the table's name
	timestamps: true // this will deactivate the timestamp columns

}, {
	updatedAt: 'last_update',
	createdAt: 'created_on'
});

//------ CUSTOMER MODELS ----//
CustomerModel = sequelize.define("customer", {
	customer_name: {
		type: Sequelize.STRING
	},
	customer_city: {
		type: Sequelize.STRING
	},
	customer_country_code: {
		type: Sequelize.STRING
	}
}, {
	tableName: 'customer', // this will define the table's name
	timestamps: true // this will deactivate the timestamp columns

}, {
	updatedAt: 'last_update',
	createdAt: 'created_on'
});

RefCountryCodeModel = sequelize.define("ref_country_code", {
	country_code: {
		type: Sequelize.STRING
	}
}, {
	tableName: 'ref_country_code', // this will define the table's name
	timestamps: false // this will deactivate the timestamp columns

});

CustomerFeedbackModel = sequelize.define("customer_feedback", {
	customer_feedback: {
		type: Sequelize.STRING
	},
	feedback_rating: {
		type: Sequelize.INTEGER
	}
}, {
	tableName: 'customer_feedback', // this will define the table's name
	timestamps: true // this will deactivate the timestamp columns

}, {
	updatedAt: 'last_update',
	createdAt: 'created_on'
});


//-------EMPLOYEE MODELS-------- //
EmployeeModel = sequelize.define("employee", {
	emp_ID: {
		type: Sequelize.STRING
	},
	emp_first_name: {
		type: Sequelize.STRING
	},
	emp_last_name: {
		type: Sequelize.STRING
	},
	emp_joining_date: {
		type: Sequelize.DATE
	},
	emp_leaving_date: {
		type: Sequelize.DATE
	},
	emp_picture: {
		type: Sequelize.DATE
	},
	emp_designation: {
		type: Sequelize.STRING
	}
}, {
	tableName: 'employees', // this will define the table's name
	timestamps: true // this will deactivate the timestamp columns

}, {
	updatedAt: 'last_update',
	createdAt: 'created_on'
});

EventModel = sequelize.define("event", {
	event_title: {
		type: Sequelize.STRING
	},
	start_time: {
		type: Sequelize.DATE
	},
	end_time: {
		type: Sequelize.DATE
	}
}, {
	tableName: 'event', // this will define the table's name
	timestamps: true // this will deactivate the timestamp columns

}, {
	updatedAt: 'last_update',
	createdAt: 'created_on'
});

EmployeeSatisfactionModel = sequelize.define("employee_satisfaction", {
	evaluation_month: {
		type: Sequelize.STRING
	},
	emp_rating: {
		type: Sequelize.INTEGER
	}
}, {
	tableName: 'employee_satisfaction', // this will define the table's name
	timestamps: true // this will deactivate the timestamp columns

}, {
	updatedAt: 'last_update',
	createdAt: 'created_on'
});

EmployeeLeaveModel = sequelize.define("emp_leaves", {
	leave_start: {
		type: Sequelize.DATE
	},
	leave_end: {
		type: Sequelize.DATE
	}
}, {
	tableName: 'emp_leaves', // this will define the table's name
	timestamps: true // this will deactivate the timestamp columns

}, {
	updatedAt: 'last_update',
	createdAt: 'created_on'
});

PayrollModel = sequelize.define("emp_payroll", {
	month_year: {
		type: Sequelize.STRING
	},
	amount: {
		type: Sequelize.INTEGER
	}
}, {
	tableName: 'emp_payroll', // this will define the table's name
	timestamps: false // this will deactivate the timestamp columns

});

RefRemunerationTypeModel = sequelize.define("ref_remuneration_types", {
	title: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING
	}
}, {
	tableName: 'ref_remuneration_types', // this will define the table's name
	timestamps: false // this will deactivate the timestamp columns

});

RefLeaveModel = sequelize.define("ref_leaves", {
	title: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING
	}
}, {
	tableName: 'ref_leaves', // this will define the table's name
	timestamps: false // this will deactivate the timestamp columns

});

TeamModel = sequelize.define("team", {
	team_name: {
		type: Sequelize.STRING
	}
}, {
	tableName: 'ref_leaves', // this will define the table's name
	timestamps: true // this will deactivate the timestamp columns
}, {
	updatedAt: 'last_update',
	createdAt: 'created_on'
});

//----- SALES MODELS ------- //
SaleModel = sequelize.define("sales", {
	sale_time: {
		type: Sequelize.DATE
	},
	sale_amount: {
		type: Sequelize.INTEGER
	}
}, {
	tableName: 'sales', // this will define the table's name
	timestamps: true // this will deactivate the timestamp columns
}, {
	updatedAt: 'last_update',
	createdAt: 'created_on'
});

ForecastedSalesModel = sequelize.define("forecasted_sales", {
	month_year: {
		type: Sequelize.STRING
	},
	forecast_amount: {
		type: Sequelize.INTEGER
	}
}, {
	tableName: 'forecasted_sales', // this will define the table's name
	timestamps: true // this will deactivate the timestamp columns
}, {
	updatedAt: 'last_update',
	createdAt: 'created_on'
});


//----- Labels Model----//
LabelsModel = sequelize.define("labels", {
	key: {
		type: Sequelize.STRING
	},
	value: {
		type: Sequelize.STRING
	}
}, {
	tableName: 'labels', // this will define the table's name
	timestamps: true // this will deactivate the timestamp columns
}, {
	updatedAt: 'last_update',
	createdAt: 'created_on'
});


//------ DB Relations -------- //
AccountModel.hasMany(UserModel, {
	foreignKey: "account_ID"
});

AccountModel.hasMany(CustomerModel, {
	foreignKey: "account_ID"
});

AccountModel.hasMany(CustomerFeedbackModel, {
	foreignKey: "account_ID"
});

AccountModel.hasMany(EmployeeModel, {
	foreignKey: "account_ID"
});

AccountModel.hasMany(EmployeeSatisfactionModel, {
	foreignKey: "account_ID"
});

AccountModel.hasMany(TeamModel, {
	foreignKey: "account_ID"
});

AccountModel.hasMany(SaleModel, {
	foreignKey: "account_ID"
});

AccountModel.hasMany(ProjectModel, {
	foreignKey: "account_ID"
});

AccountModel.hasMany(ForecastedSalesModel, {
	foreignKey: "account_ID"
});

AccountModel.hasMany(DepartmentModel, {
	foreignKey: "account_ID"
});


sequelize
	.sync({
		force: true
	})
	.then(function() {
		console.log('It worked fine!')
	})
	.catch(function(err) {
		console.log('An error occurred while creating the table:', err)
	});