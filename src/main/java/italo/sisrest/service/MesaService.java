package italo.sisrest.service;

import italo.sisrest.repository.PedidoRepository;
import italo.sisrest.repository.UltimoPedidoAtendidoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MesaService {

    private final PedidoRepository pedidoRepository;

    private final UltimoPedidoAtendidoRepository ultimoPedidoAtendidoRepository;

    @Transactional
    public void atendeMesa( int mesa ) {
        pedidoRepository.updateAtendidosByMesa( mesa );
    }

}
