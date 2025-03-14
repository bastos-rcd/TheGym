<?php

namespace App\Controller\Api;

use App\Repository\CoachRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api', name: 'api_coach_')]
class CoachApiController extends AbstractController
{
    #[Route('/coachs', methods: ['GET'])]
    #[IsGranted('PUBLIC_ACCESS')]
    public function getCoachs(CoachRepository $repo): JsonResponse
    {
        $coachs = $repo->findAll();

        return $this->json($coachs, 200, [], ['groups' => 'coach:read']);
    }

    #[Route('/coachs/{id}', methods: ['GET'])]
    #[IsGranted('PUBLIC_ACCESS')]
    public function getCoach(CoachRepository $repo, int $id): JsonResponse
    {
        $coach = $repo->find($id);

        if (!$coach) {
            return $this->json(['error' => 'Coach not found'], 404);
        }

        return $this->json($coach, 200, [], ['groups' => 'coach:read']);
    }
}
