const dataM = require("../model/Data");
const reviewsM = require("../model/reviews.m");

exports.data = async () => {
  let dataMovies = dataM.getMovies();
  for (let i = 0; i < dataMovies.length; i++) {
    let el = dataMovies[i].reviews;
    for (let j = 0; j < el.length; j++) {
      if (!el[j].interestingVotes) el[j].interestingVotes = [0, 0];
      else {
        let d = el[j].interestingVotes.down ? el[j].interestingVotes.down : 0;
        let u = el[j].interestingVotes.up ? el[j].interestingVotes.up : 0;
        el[j].interestingVotes = [d, u];
      }
      let c = await reviewsM.check(dataMovies[i].id, el[j].author);
      if (!c) await reviewsM.addReview(dataMovies[i].id, el[j]);
    }
  }
  console.log("xong review");
};
