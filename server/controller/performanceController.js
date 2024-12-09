const express = require("express");
const { getDataFromCW } = require("../service/performanceService");

// Create router with express.
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Get the data from the request.
    const timePeriod = req.query.timePeriod;
    const period = +req.query.period;
    const ipAddress = req.query.ipAddress;

    // Check if all the data is valid, if not - return appropriate message.
    if (!timePeriod)
      return res.json({ sucsses: false, msg: "Time Period missing" });
    if (!period) return res.json({ sucsses: false, msg: "Period missing" });
    if (!ipAddress)
      return res.json({ sucsses: false, msg: "Ip Address missing" });

    // Send the data to the service and wait for the result, if result is not valid return appropriate message.
    const result = await getDataFromCW(timePeriod, period, ipAddress);
    if (typeof result === "string")
      return res.json({ sucsses: false, msg: result });

    // Send the data back to the client.
    return res.json({ sucsses: true, data: result });
  } catch (error) {
    console.log(error);
    return res.json({ sucsses: false, msg: error.message });
  }
});

module.exports = router;
