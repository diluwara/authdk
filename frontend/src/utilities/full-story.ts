import * as FullStory from "@fullstory/browser";

const initFullStory = () => {
  if (window.env.ENABLE_FULL_STORY) {
    FullStory.init({ orgId: window.env.FULLSTORY_ORG_ID });
  }
};

const getFSQuestionCustomEvent = (stepCode: string, stepLabel: string) => {
  if (window.env.ENABLE_FULL_STORY) {
    FullStory.event(stepCode, {
      question_str: stepLabel,
    });
  }
};

export { initFullStory, getFSQuestionCustomEvent };
