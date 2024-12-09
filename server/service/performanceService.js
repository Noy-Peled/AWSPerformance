const sdk = require("@aws-sdk/client-cloudwatch");
const sdkEC2 = require("@aws-sdk/client-ec2");
const dayjs = require("dayjs");
const { getTimeToStart } = require("../utils/timeCalcUtils");

// AWS environments
const envToConnectAWS = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

const getInstanceIdByIpAdress = async (ipAddress) => {
  // Create connection to EC2 with the region, access key ans secret access key.
  const ec2 = new sdkEC2.EC2Client({ envToConnectAWS });

  // The params to find the instance Id by ip address.
  const params = {
    Filters: [
      {
        Name: "private-ip-address",
        Values: [`${ipAddress}`],
      },
    ],
  };

  // create DescribeInstancesCommand object with the params.
  const object = new sdkEC2.DescribeInstancesCommand(params);

  // Send the object to EC2 and wait for the result.
  const data = await ec2.send(object);

  // Finding the instance id from the data and return it, if instance id not found return false.
  if (data.Reservations.length === 0) {
    return false;
  }
  const instanceId = data.Reservations[0].Instances[0].InstanceId;
  return instanceId;
};

const getDataFromCW = async (timePeriod, period, ipAddress) => {
  // Create connection to cloud watch with the region, access key ans secret access key.
  const CW = new sdk.CloudWatch({ envToConnectAWS });

  // Get the data from the functions, if not valid return appropriate message.
  const instanceId = await getInstanceIdByIpAdress(ipAddress);
  if (!instanceId) return "No instance match this ip addres";
  const timeToStart = getTimeToStart(timePeriod);

  // The params to monitor the instance Id
  const params = {
    MetricName: "CPUUtilization",
    Namespace: "AWS/EC2",
    Period: period,
    Statistics: ["Average"],
    Dimensions: [
      {
        Name: "InstanceId",
        Value: instanceId,
      },
    ],
    StartTime: new Date(timeToStart),
    EndTime: new Date(),
  };

  // Get statistics from cloud watch by the data in params.
  const resp = await CW.getMetricStatistics(params);

  // Create an array of average points and time stamp from the response we received.
  const avgPoints = resp?.Datapoints?.map((e) => e.Average);
  const timeStamp = resp.Datapoints.map((e) =>
    dayjs(e.Timestamp).format("HH:mm")
  );

  return { xValues: timeStamp, yValues: avgPoints };
};

module.exports = { getDataFromCW };
