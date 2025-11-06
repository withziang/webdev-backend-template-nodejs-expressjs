class AppServer{
	static async mockFunction(req, res){
		console.log(`HTTP call -- ${req.url}`);
		// const { ... } = req.params;
		// const { ... } = req.query;

		try {
			return res.status(200).json({});
		} catch (err) {
			console.error(`Error in http AppServer.mockFunction -- ${err}`);
			return res.status(500).json({
				error: "Internal server error"
			});
		}
	}
}


export default AppServer;