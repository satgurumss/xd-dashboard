var Sequelize = require('sequelize'),
	sequelize = new Sequelize('xdensitydb', 'root', 'root', {
		dialect: "mysql",
		// or 'sqlite', 'postgres', 'mariadb'
		host: 'localhost',
		port: 8889, // or 5432 (for postgres)
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

RefUserModel = sequelize.define("refUserModel", {
	role_ID: {
		type: Sequelize.STRING,
		primaryKey:true
	},
	title: {
		type: Sequelize.STRING
	},
	description:{
		type: Sequelize.STRING
	}
}, {
	tableName: 'ref_user_role', // this will define the table's name
	timestamps: false // this will deactivate the timestamp columns
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
		type: Sequelize.STRING,
		primaryKey:true
	},
	title:{
		type:Sequelize.STRING
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
	},
	annual_leaves_allowed:{
		type:Sequelize.INTEGER
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
	remunerationType: {
		type: Sequelize.STRING,
		primaryKey:true
	},
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
	leaveType: {
		type: Sequelize.STRING,
		primaryKey:true
	},
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
	tableName: 'team', // this will define the table's name
	timestamps: true // this will deactivate the timestamp columns
}, {
	updatedAt: 'last_update',
	createdAt: 'created_on'
});

TeamMembersModel = sequelize.define("team_members", {}, {
	tableName: 'team_members', // this will define the table's name
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

//ACCOUNT REALTIONS
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

AccountModel.hasMany(TeamModel, {
	foreignKey: "account_ID"
});

//USER ROLE TYPE
UserModel.belongsTo(RefUserModel,{
	foreignKey:"userRole"
});

//EMPLOYEE REALTIONS
EmployeeModel.hasMany(EmployeeSatisfactionModel, {
	foreignKey: "employee_ID"
});

EmployeeModel.hasMany(ProjectModel, {
	foreignKey: "employee_ID"
});

EmployeeModel.hasMany(SaleModel, {
	foreignKey: "employee_ID"
});

EmployeeModel.hasMany(EmployeeLeaveModel, {
	foreignKey: "employee_ID"
});

EmployeeModel.hasMany(PayrollModel, {
	foreignKey: "employee_ID"
});

EmployeeModel.belongsToMany(TeamModel, {
	through: TeamMembersModel,
	foreignKey: "employee_ID"
});

EmployeeModel.belongsTo(EmployeeModel, {
	foreignKey: "manager_ID",
	as: "Manager"
});

// REF REMUNERATION RELATIONS
PayrollModel.belongsTo(RefRemunerationTypeModel,{
	foreignKey:"remunerationType"
});

// TEAM RELATIONS
TeamModel.belongsToMany(EmployeeModel, {
	through: TeamMembersModel,
	foreignKey: "team_ID"
});

// REF_LEAVE RELATIONS
EmployeeLeaveModel.belongsTo(RefLeaveModel,{
	foreignKey: "leaveType"
});

//CUSTOMERS RELATIONS
CustomerModel.hasMany(CustomerFeedbackModel, {
	foreignKey: "customer_ID"
});

CustomerModel.hasMany(ProjectModel, {
	foreignKey: "customer_ID"
});

CustomerModel.hasMany(SaleModel, {
	foreignKey: "customer_ID"
});

// REF_LEAVE RELATIONS
CustomerModel.belongsTo(RefCountryCodeModel,{
	foreignKey: "customer_country_code"
});


//DEPT RELATIONS
DepartmentModel.hasMany(ProjectModel, {
	foreignKey: "department_ID"
});

DepartmentModel.hasMany(EmployeeModel, {
	foreignKey: "department_ID"
});

DepartmentModel.hasMany(ForecastedSalesModel,{
	foreignKey: "department_ID"
})

sequelize
	.sync({
		force: false
	})
	.then(function() {
		console.log('It worked fine!')
	})
	.catch(function(err) {
		console.log('An error occurred while creating the table:', err)
	});

// EXPORTING MODULES FOR USER
exports.accountModel = AccountModel;
exports.userModel = UserModel;
exports.refUserModel = RefUserModel;
exports.departmentModel = DepartmentModel;
exports.projectModel = ProjectModel;
exports.customerModel = CustomerModel;
exports.refCountryModel = RefCountryCodeModel;
exports.customerFeedbackModel = CustomerFeedbackModel;
exports.employeeModel = EmployeeModel;
exports.eventsModel = EventModel;
exports.employeeSatisfactionModel = EmployeeSatisfactionModel;
exports.empoloyeeLeaveModel = EmployeeLeaveModel;
exports.payrollModel = PayrollModel;
exports.refRemunerationModel = RefRemunerationTypeModel;
exports.refLeaveModel = RefLeaveModel;
exports.teamModel = TeamModel;
exports.teamMemberModel = TeamMembersModel;
exports.saleModel = SaleModel;
exports.forecastedSaleModel = ForecastedSalesModel;
exports.labelsModel = LabelsModel;