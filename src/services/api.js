import supabase from './supabase';

const tratarErro = async (requisicao) => {
  const resposta = await requisicao;
  if (resposta.error) {
    alert("ERRO NO BANCO: " + resposta.error.message);
    throw resposta.error;
  }
  return resposta;
};

export const equipamentoService = {
  listar: () => tratarErro(supabase.from('equipamentos').select('*')),
  criar: (dados) => tratarErro(supabase.from('equipamentos').insert([dados]))
};

export const cidadeService = {
  listar: () => tratarErro(supabase.from('cidades').select('*')),
  criar: (dados) => tratarErro(supabase.from('cidades').insert([dados]))
};

export const funcionarioService = {
  listar: () => tratarErro(supabase.from('funcionarios').select('*')),
  criar: (dados) => tratarErro(supabase.from('funcionarios').insert([dados]))
};

export const servicoService = {
  listar: () => tratarErro(supabase.from('servicos').select('*')),
  criar: (dados) => tratarErro(supabase.from('servicos').insert([dados]))
};