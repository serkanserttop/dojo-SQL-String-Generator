var assert = require("assert");
var SQL = require('../src/sql');


describe('Check Columns', function(){
  it('should return star column', function(){
  	var sql = new SQL();
		//console.log(sql);
		sql.addCommand('SELECT')
	  	.addTable('x')
	  	.build();
  	assert.equal(sql.actualSqlString, 'SELECT * FROM x');
  });
  it('should return three columns', function(){
  	var sql = new SQL();
  	sql.addColumns(['a', 'b'])
  		.addCommand('SELECT')
  		.addColumns('c')
  		.addTable('x')
  		.build();
  	//console.log(sql);
  	assert.equal(sql.actualSqlString, 'SELECT a, b, c FROM x');
  });
  it('should build where statement with 3 params', function(){
  	var sql = new SQL();
  	sql.addColumns(['a', 'b'])
  		.addCommand('SELECT')
  		.addColumns('c')
  		.addTable('x')
  		.addWhere('a', '>', '100')
  		.build();
  	//console.log(sql);
  	assert.equal(sql.actualSqlString, 'SELECT a, b, c FROM x WHERE a > 100');
  });
  it('should build where statement with 2 params', function(){
  	var sql = new SQL();
  	sql.addColumns(['a', 'b'])
  		.addCommand('SELECT')
  		.addColumns('c')
  		.addTable('x')
  		.addWhere('a', '100')
  		.build();
  	//console.log(sql);
  	assert.equal(sql.actualSqlString, 'SELECT a, b, c FROM x WHERE a = 100');
  });
});