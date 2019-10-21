import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class EnrolmentInformation {
  get key() {
    return 'EnrolmentInformation';
  }

  async handle({ data }) {
    const { enrolment, student, planChoosed } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Inscrição realizada com sucesso',
      template: 'newEnrolment',
      context: {
        student: student.name,
        plan: planChoosed.title,
        monthPrice: planChoosed.price,
        totalPrice: enrolment.price,
        endDate: format(
          parseISO(enrolment.end_date),
          "dd 'de' MMMM' de' yyyy",
          {
            locale: pt,
          }
        ),
        startDate: format(
          parseISO(enrolment.start_date),
          "dd 'de' MMMM' de' yyyy",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new EnrolmentInformation();
