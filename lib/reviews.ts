// Real Google reviews of Guhayavarman Fitness (Madipakkam, Chennai).
// Captured from the public Google Business listing on 17 Oct 2026.
//
// Rules for this file:
// - Every quote is copied word for word from the review. Cuts are marked with "…". Never reword.
// - Only reviews Google shows as 5 stars (48 of the 51 were 5 stars when captured).
// - Reviewer names are shortened to first name + last initial.
// - Reviewers call the coach "Vikram"; Guhay approved showing the name (17 Oct 2026).
// - Weight-loss results are included with Guhay's approval (17 Oct 2026); the section notes
//   that results vary. Medical-symptom lines stay out.
// - Spans are chosen so no quote contains an em-dash (site copy rule), without editing words.
// - When the rating or count changes on Google, update GOOGLE_RATING and the capture date.

export const GOOGLE_RATING = {
  score: "4.9",
  count: 51,
  captured: "Oct 2026",
  url: "https://www.google.com/maps/search/?api=1&query=Guhayavarman%20Fitness%20Madipakkam",
} as const;

export type Review = {
  name: string;
  tag: string;
  quote: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Rubanraj H.",
    tag: "Weight loss",
    quote: "You guided me step by step, starting with the necessary blood tests. Based on the reports, you created a personalized diet plan along with proper training and strengthening exercises. That structured approach really made a big difference. When I started, my weight was 113 kg, and within just one and a half months, I have reduced around 10 kg …",
  },
  {
    name: "Amritha P.",
    tag: "Weight loss",
    quote: "At that time, I was 99 kg and dealing with poor sleep, high stress, and a few other health issues related to my weight. … it’s only been about 2.5 months, and I’m already down to 88 kg! One of the biggest surprises for me was that I never felt hungry or deprived.",
  },
  {
    name: "Rohit",
    tag: "Knee tear",
    quote: "Despite a slight tear in my knee, Vikram's expertise and guidance have led to significant improvement in my condition.",
  },
  {
    name: "Venkat S.",
    tag: "Sports injury",
    quote: "Was seeking his help for a sports related injury caused due to over use. Vikram was able to narrow down on the issue even from the initial discussions.",
  },
  {
    name: "Madhavi C.",
    tag: "Neck pain and posture",
    quote: "Vikram is very knowledgeable and worked with and around my needs and limitations. He definitely pushes you 🙂 but you will realise that’s just the right amount of push you needed.",
  },
  {
    name: "Praneeth C.",
    tag: "Personal training",
    quote: "Great trainer. Very attentive and knowledgeable with years of experience. He tracked every workout and built a solid plan tailored just for me. Highly recommended!",
  },
  {
    name: "Divya S.",
    tag: "Parents in their 60s and 70s",
    quote: "My parents, who are in their in their 60s and early 70s, have been training with Vikram for a couple of months now, and I couldn't be happier with the progress they've made! He structures each session so thoughtfully, tailoring exercises to their abilities while still challenging them to improve every day.",
  },
  {
    name: "Sugumar M.",
    tag: "Online strength training",
    quote: "I would say Vikram knows his art and is very systematic in addressing issues around strength, flexibility and nutrition. He has a very personable attitude, spends time listening to your concerns, asks for minimum necessary weight equipment and does not give a one-size-fit-all program.",
  },
  {
    name: "Leo",
    tag: "Shoulder pain",
    quote: "He quickly identified the cause of my shoulder pain and adjusted my workouts to help with recovery. He also corrected my push-up form, which was making the pain worse.",
  },
  {
    name: "Gowrishankar T.",
    tag: "Beginner",
    quote: "He makes sure to motivate and push hard but ensures that it is always within limits of my body (which he understands by meticulously tracking progress of my workouts on his tablet). I always feel challenged and good after my workouts without fear of injury.",
  },
  {
    name: "Deepika R.",
    tag: "Mum, age 72",
    quote: "My mom age is 72 and she was not able stand properly and walking with help of others … With in month my mom start to little bit walk without anything help and climbing the 2 floors of terrace with 40 steps.",
  },
  {
    name: "Kavitha L.",
    tag: "Personal training",
    quote: "He is meticulous in planning the schedule and sticks to it. … Workouts are tailor made to suit individual’s capacity and ensure no injury or damage in the process. He is polite and respectful which puts me at comfort as a female trainee.",
  },
  {
    name: "Pranav R.",
    tag: "1 on 1 strength training",
    quote: "Right from the get go, I could tell how knowledgeable, data driven and professional Vikram is. … He started focussing on my form in various exercises especially making sure my lower back was not getting strained. This is what distinguishes a good and a great trainer imo.",
  },
  {
    name: "Ganesh S.",
    tag: "Diet and training",
    quote: "They explained the ‘why’ behind every food and workout suggestions, which helped me stay consistent. They’re also very responsive and updated the plan regularly based on my progress.",
  },
  {
    name: "Gouri M.",
    tag: "Online personal training",
    quote: "Vikram is very disciplined and organized with his training approach. Very few trainers go into such a detail level. He is accommodating to your needs.",
  },
  {
    name: "Mathew A.",
    tag: "Online training",
    quote: "He has the capacity of changing things up, making the workouts interesting as well as challenging using new and varied techniques along with different types of fitness equipment. He is extremely good with online training.",
  },
  {
    name: "Nilesh P.",
    tag: "Personal training",
    quote: "He helps you understand the target muscles of the different exercises and always has alternative for each of them if they get too difficult.",
  },
];
