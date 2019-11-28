async 异步
aswit 同步
```
	async hello() {
		return 'hello'
	},
	async world() {
		return 'world'
	}

```
async函数返回的是一个promise 对象，要获取到promise 返回值，应该用then 方法
```
	this.hello().then((res) => {
		console.log(res)
	})
	this.world().then((res) => {
		console.log(res)
	});
	console.log('hello world')
	结果是
	hello world
	hello
	world
```
async是异步函数, hello word会先一步执行 下面看await
```
	async created() {
		await this.hello(false).then((res) => {
			console.log(res)
		})
		await this.world().then((res) => {
			console.log(res)
		});
		 console.log('hello world')
		}
	结果
	hello
	world
	hello world
```
await必须写在async方法里面 可以理解为异步方法里面的同步方法 hello()执行完才会去执行下面的 所以helloword会最后出现