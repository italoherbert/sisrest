package italo.sisrest.exception;

public interface Errors {
    
    public final static String CAMPO_OBRIGATORIO = "O campo '$1' é de preenchimento obrigatório.";
    public final static String VALOR_MENOR_QUE_ZERO = "O valor do campo '$1' deve ser um número maior que zero.";

    public final static String LOGIN_INVALIDO = "O username e senha informados não batem com algum usuário registrado no sistema.";
    public final static String ACESSO_NAO_AUTORIZADO = "Acesso não autorizado a este recurso.";

    public final static String CARDAPIO_ITEM_NAO_ENCONTRADO = "Item de cardápio não encontrado.";
    public final static String CARDAPIO_ITEM_JA_EXISTE = "Já existe um item de cardápio com a descrição informada.";

}
