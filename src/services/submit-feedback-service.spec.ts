import { SubmitFeedbackService } from "./submit-feedback-service";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Example comment',
      screenshot: 'data:image/png;base64.png'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without a type', async() => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'teste',
      screenshot: 'data:image/png;base64.png'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback without a comment', async() => {
    await expect(submitFeedback.execute({
      type: 'type',
      comment: '',
      screenshot: 'data:image/png;base64.png'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback without an invalid image', async() => {
    await expect(submitFeedback.execute({
      type: 'type',
      comment: 'comment',
      screenshot: 'base64.png'
    })).rejects.toThrow()
  })
});