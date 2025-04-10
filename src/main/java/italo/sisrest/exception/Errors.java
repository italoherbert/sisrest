package italo.sisrest.exception;

public interface Errors {
    
    public final static String CAMPO_OBRIGATORIO = "O campo '$1' é de preenchimento obrigatório.";
    public final static String VALOR_MENOR_QUE_ZERO = "O valor do campo '$1' deve ser um número maior que zero.";
    public final static String VALOR_NAO_INTEIRO_NEM_ASTERISCO = "O valor do campo '$1' deve ser um número inteiro ou asterisco.";

    public final static String OPCAO_INVALIDA = "A opção '$1' não corresponde a alguma opção de ($2)";

    public final static String LOGIN_INVALIDO = "O username e senha informados não batem com algum usuário registrado no sistema.";
    public final static String ACESSO_NAO_AUTORIZADO = "Acesso não autorizado a este recurso.";

    public final static String CARDAPIO_ITEM_NAO_ENCONTRADO = "Item de cardápio não encontrado.";
    public final static String CARDAPIO_ITEM_JA_EXISTE = "Já existe um item de cardápio com a descrição informada.";

    public final static String CARDAPIO_ITEM_NAO_ENCONTRADO_ID = "O item de cardápio de ID: '$1' não foi encontrado.";

    public final static String PEDIDO_NAO_ENCONTRADO = "Pedido não encontrado.";

}
