
function SQL(){
	this.actualSqlString = null;
	this.sqlString = [];
	this.command = null;
	this.columns = [];
	this.sql = [];
	this.where = [];
	this.table = [];
}

SQL.prototype.addCommand = function(cmd){
	this.command = cmd;
	return this;
};

SQL.prototype.addColumns = function(q){
	if(typeof q === 'string'){
		this.columns.push(q);
	}
	else if(q instanceof Array){
		this.columns = this.columns.concat(q);
	}
	else{
		throw new Error('incorrect column request');
	}
	return this;
}

SQL.prototype.addTable = function(table){
	this.table.push(table);
	return this;
}

SQL.prototype.addWhere = function(col, condition, val){
	if(arguments.length === 2){
		val = condition;
		condition = '=';
	}
	this.where.push(col + ' ' + condition + ' ' + val);
	return this;
}

SQL.prototype.build = function(){
	this.generateCommandString();
	this.generateColumnsString();
	this.generateTableString();
	this.generateWhereString();
	this.actualSqlString = this.sqlString.join(' ');
}

SQL.prototype.generateCommandString = function(){
	if(this.command === null){
		throw new Error('no command specified');
	}
	this.sqlString.push(this.command);
}

SQL.prototype.generateTableString = function(){
	if(this.table === null || this.table === ''){
		throw new Error('no table specified');
	}
	this.sqlString.push('FROM ' + this.table.join(', '));
}

SQL.prototype.generateColumnsString = function(){
	if(this.columns.length === 0)	{
		this.sqlString.push('*');
	}
	else{
		this.sqlString.push(this.columns.join(', '));
	}
}

SQL.prototype.generateWhereString = function(){
	if(this.where === null){
		throw new Error('no where implemented');
	}
	else if(this.where.length === 0){
		return;
	}
	this.sqlString.push('WHERE ' + this.where.join(' AND '));
}

module.exports = SQL;