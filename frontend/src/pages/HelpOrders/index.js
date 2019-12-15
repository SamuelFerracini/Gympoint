import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import ReactModal from 'react-modal';

import * as Yup from 'yup';
import api from '../../services/api';

import { Head, Table, Center, Content } from '../../styles/global';

import {
  ModalContainer,
  ModalContent,
  ModalForm,
  AnswerSize,
  ModalInput,
} from './styles';

const schema = Yup.object().shape({
  answer: Yup.string()
    .max(255, 'Número máximo de caracteres excedido')
    .required('Resposta obrigatória'),
});

export default function HelpOrders() {
  const [questions, setQuestions] = useState([]);
  const [modalHelpOrder, setModalHelpOrder] = useState();
  const [showModal, setShowModal] = useState(false);
  const [answer, setAnswer] = useState('');

  const customStyles = {
    content: {
      width: '450px',
      height: '425px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: 'rgba(0,0,0,0.7)',
    },
  };

  const answerSize = useMemo(() => {
    return 255 - answer.length;
  }, [answer]);

  async function loadQustions() {
    const { data } = await api.get('/help-orders');
    setQuestions(data);
  }

  useEffect(() => {
    loadQustions();
  }, []); // eslint-disable-line

  function handleAnswer(suport) {
    setModalHelpOrder(suport);
    setShowModal(true);
  }

  async function handleSubmit(data) {
    const { id } = modalHelpOrder;
    await api.post(`/help-orders/${id}/answer`, {
      ...data,
    });
    toast.success(`Respondido com sucesso`);
    setShowModal(false);
    loadQustions();
  }

  return (
    <Content width="734px">
      <Head>
        <h2>Pedidos de auxílio</h2>
      </Head>
      <Table>
        {questions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ALUNO</th>
              </tr>
            </thead>
            <tbody>
              {questions.map(question => (
                <tr key={question.id}>
                  <td>{question.student.name}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleAnswer(question)}
                    >
                      responder
                    </button>
                    <button></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Center>
            <h1>Não há pedidos de auxílio</h1>
          </Center>
        )}
      </Table>

      <ReactModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <ModalContainer>
          <ModalContent>
            <strong>
              PERGUNTA DO ALUNO:{' '}
              <span>{modalHelpOrder && modalHelpOrder.student.name}</span>
            </strong>
            <span> {modalHelpOrder && modalHelpOrder.question}</span>
          </ModalContent>
          <ModalForm
            initialData={modalHelpOrder}
            schema={schema}
            onSubmit={handleSubmit}
          >
            <label>
              <strong>SUA RESPOSTA</strong>

              <ModalInput
                multiline
                name="answer"
                onChange={e => setAnswer(e.target.value)}
                placeholder="Resposta..."
              />
            </label>
            <AnswerSize limit={answerSize < 0}>{answerSize}/255</AnswerSize>
            <button type="submit">Responder aluno</button>
          </ModalForm>
        </ModalContainer>
      </ReactModal>
    </Content>
  );
}
