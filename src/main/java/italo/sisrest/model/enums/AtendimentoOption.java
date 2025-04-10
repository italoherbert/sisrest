package italo.sisrest.model.enums;

public enum AtendimentoOption implements EnumOption {
    SOMENTE_NAO_ATENDIDOS, SOMENTE_ATENDIDOS, TODOS;

    @Override
    public String label() {
        return switch( this ) {
            case SOMENTE_NAO_ATENDIDOS -> "Somente não atendidos";
            case SOMENTE_ATENDIDOS -> "Somente atendidos";
            case TODOS -> "Todos";
        };
    }
}
