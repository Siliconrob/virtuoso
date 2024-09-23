import {APISearchSummary, ItemDetails} from "../src/PagedResults";

const testIds = [324240,
  484408, 37785, 38158, 38160, 38162, 38165, 38176,
  38296, 38297, 38298, 38315, 38450, 38558, 38613,
  38617, 38618, 38619, 38620, 38625, 39092, 39105,
  39159, 39161, 39162, 39166, 39182, 39221, 39601,
  39768, 39772, 39773, 53292, 57343, 65095, 137379,
  553235, 762124, 908521, 908529, 908530, 908535,
  908537, 909646, 910582, 910710, 910925, 910943,
  910944, 910945, 910948, 910958, 910959, 910960,
  910961, 914920, 13758, 40067, 45264, 79662,
  79893, 80180, 81104, 81457, 81513, 81731, 82090,
  82607, 82656, 83233, 83234, 83266, 83967, 83992,
  84247, 84288, 84296, 84503, 84518, 84544, 84572,
  84611, 84956, 84957, 86695, 90992, 91019, 91685,
  93631, 93889, 102298, 102662];

const testResults = new APISearchSummary();
testResults.objectIDs = testIds;
testResults.total = testIds.length;

const testItem = new ItemDetails();
testItem.primaryImageSmall = "https://primaryimagesmall.url.invalid";
testItem.title = "Test Data"
testItem.objectDate = "No dates";
testItem.department = "Invalid";
testItem.artistRole = "None";
testItem.artistDisplayName = "No one";
testItem.artistNationality = "None";
testItem.tags = [{ term: "Test" }];
testItem.primaryImage = "https://primaryimage.url.invalid";
testItem.objectURL = "https://object.url.invalid";

const data = {
  results: testResults,
  item: testItem,
};

export default data;