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
  criar: (dados) => tratarErro(supabase.from('equipamentos').insert([dados])),
  atualizar: (id, dados) => tratarErro(supabase.from('equipamentos').update(dados).eq('id', id)),
  excluir: (id) => tratarErro(supabase.from('equipamentos').delete().eq('id', id))
};

export const cidadeService = {
  listar: () => tratarErro(supabase.from('cidades').select('*')),
  criar: (dados) => tratarErro(supabase.from('cidades').insert([dados])),
  atualizar: (id, dados) => tratarErro(supabase.from('cidades').update(dados).eq('id', id)),
  excluir: (id) => tratarErro(supabase.from('cidades').delete().eq('id', id))
};

export const funcionarioService = {
  listar: () => tratarErro(supabase.from('funcionarios').select('*')),
  criar: (dados) => tratarErro(supabase.from('funcionarios').insert([dados])),
  atualizar: (id, dados) => tratarErro(supabase.from('funcionarios').update(dados).eq('id', id)),
  excluir: (id) => tratarErro(supabase.from('funcionarios').delete().eq('id', id))
};

export const servicoService = {
  listar: () => tratarErro(supabase.from('servicos').select('*')),
  criar: (dados) => tratarErro(supabase.from('servicos').insert([dados])),
  atualizar: (id, dados) => tratarErro(supabase.from('servicos').update(dados).eq('id', id)),
  excluir: (id) => tratarErro(supabase.from('servicos').delete().eq('id', id))
};